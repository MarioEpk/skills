package com.skillsmanagerapi.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.itextpdf.xmp.impl.Base64;
import com.skillsmanagerapi.dto.CvDto;
import com.skillsmanagerapi.dto.LanguageDto;
import com.skillsmanagerapi.dto.PositionTypeDto;
import com.skillsmanagerapi.dto.ProjectDto;
import com.skillsmanagerapi.dto.SkillDto;
import com.skillsmanagerapi.dto.TechnologyDto;
import com.skillsmanagerapi.dto.EducationDto;
import com.skillsmanagerapi.enums.AvatarType;
import com.skillsmanagerapi.enums.ContextDataKey;
import io.github.erdos.stencil.API;
import io.github.erdos.stencil.EvaluatedDocument;
import io.github.erdos.stencil.PreparedTemplate;
import io.github.erdos.stencil.TemplateData;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.w3c.tidy.Tidy;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.itextpdf.text.pdf.BaseFont.CP1250;
import static com.itextpdf.text.pdf.BaseFont.EMBEDDED;
import static org.thymeleaf.templatemode.TemplateMode.HTML;

@Service
@Slf4j
public class ExportService {
    private static final String UTF_8 = "UTF-8";




    public byte[] generateCvDoc(final CvDto cvDto) throws Exception {

        log.info("Generating DOCX for user {} has started ...", cvDto.getUser().getEmail());

        //preparing data
        final URL templateUrl = getClass().getResource("/templates/template_doc.docx");
        if (templateUrl == null) {
            log.error("Cannot read template for DOCX");
            throw new Exception("Cannot read template for DOCX");
        }
        final File template = new File(templateUrl.toURI());


        //reuse Context and convert to map (stencil project format)
        final Context context = addCvIntoContext(cvDto);
        Map<String, Object> data = context.getVariableNames()
                .stream()
                .collect(Collectors.toMap(c -> c, context::getVariable));

        //add extra values
        data.put(ContextDataKey.USER_LAST_NAME_SHORT, cvDto.getUser().getLastName() == null ?
                "" : (cvDto.getUser().getLastName().charAt(0) + "."));
        data.put(ContextDataKey.AVATAR_IMAGE, loadAvatarImage(cvDto.getAvatar()));

        //convert context to map
        final TemplateData td = TemplateData.fromMap(new ObjectMapper().convertValue(data, Map.class));

        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            log.info("DOCX is being created");

            final PreparedTemplate prepared = API.prepare(template);
            final EvaluatedDocument rendered = API.render(prepared, td);
            rendered.writeToStream(outputStream);
            prepared.cleanup();
            log.info("DOCX created successfully");
            return outputStream.toByteArray();
        } catch (Exception e) {
            log.error("There was error with creating DOCX. Exception: {}", e.getMessage());
            throw e;
        }


    }



    public byte[] generateCvPdf(@NonNull final CvDto cvDto) throws Exception {

        log.info("Generating PDF for user {} has started ...", cvDto.getUser().getEmail());

        // We set-up a Thymeleaf rendering engine. All Thymeleaf templates
        // are HTML-based files located under "src/resources/templates".
        // If you want to add templates into file, just change prefix
        final ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
        templateResolver.setPrefix("/templates/");
        templateResolver.setSuffix(".html");
        templateResolver.setTemplateMode(HTML);
        templateResolver.setCharacterEncoding(UTF_8);

        final TemplateEngine templateEngine = new TemplateEngine();
        templateEngine.setTemplateResolver(templateResolver);

        // Variables inside context will be used in template
        final Context context = this.addCvIntoContext(cvDto);

        log.info("Creating xHTML template");

        // Flying Saucer needs XHTML - not just normal HTML. To make our life
        // easy, use JTidy to convert the rendered Thymeleaf template to
        // XHTML.
        // Note that this might not work for very complicated HTML. But
        // it's good enough for a simple pdf.
        final String renderedHtmlContent = templateEngine.process("pdf", context);
        final String xHtml = convertToXhtml(renderedHtmlContent);

        final ITextRenderer renderer = new ITextRenderer();
        renderer.getFontResolver().addFont("static/fonts/Montserrat-Light.ttf", CP1250, EMBEDDED);
        renderer.getFontResolver().addFont("static/fonts/Montserrat-Medium.ttf", CP1250, EMBEDDED);
        renderer.getFontResolver().addFont("static/fonts/Montserrat-SemiBold.ttf", CP1250, EMBEDDED);
        renderer.getFontResolver().addFont("static/fonts/Montserrat-ExtraBold.ttf", CP1250, EMBEDDED);

        //sanitize xml characters
        String xHtmlSanitized = sanitize(xHtml);
        renderer.setDocument(xHtmlSanitized.getBytes(StandardCharsets.UTF_8));
        renderer.layout();

        log.info("xHTML template completed, creating PDF");

        // And finally, we create the PDF:
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            renderer.createPDF(outputStream);
            log.info("Creating PDF completed");

            return outputStream.toByteArray();
        } catch (Exception e) {
            log.error("there was error with creatingPDF using outputStream. Exception: {}", e.getMessage());

            throw e;
        }
    }

    private String sanitize(String xHtml) {
        //allowed chars in XML 1.0
        String xml10pattern = "[^"
                + "\u0009\r\n"
                + "\u0020-\uD7FF"
                + "\uE000-\uFFFD"
                + "\ud800\udc00-\udbff\udfff"
                + "]";
        return xHtml.replaceAll(xml10pattern, " "); //replace invalid chars by " "
    }

    private Context addCvIntoContext(@NonNull final CvDto cvDto) {
        final Context context = new Context();

        final List<SkillDto> sortedSkillsDto = cvDto.getSkills().stream().sorted().collect(Collectors.toList());
        final List<TechnologyDto> sortedTechnologiesDto = cvDto.getTechnologies().stream().sorted().collect(Collectors.toList());
        final List<LanguageDto> sortedLanguagesDto = cvDto.getLanguages().stream().sorted().collect(Collectors.toList());
        final List<ProjectDto> sortedProjects = cvDto.getProjects().stream().sorted().collect(Collectors.toList());
        final List<EducationDto> sortedEducationsDto = cvDto.getEducations().stream().sorted().collect(Collectors.toList());

        context.setVariable(ContextDataKey.AVATAR_TYPE_MAN, AvatarType.MEN);
        context.setVariable(ContextDataKey.AVATAR_TYPE_WOMEN, AvatarType.WOMAN);
        context.setVariable(ContextDataKey.AVATAR, cvDto.getAvatar());
        context.setVariable(ContextDataKey.USER, cvDto.getUser());
        context.setVariable(ContextDataKey.POSITIONS, safeArray(cvDto.getPositions()));
        context.setVariable(ContextDataKey.PROFILE, cvDto.getProfile());
        context.setVariable(ContextDataKey.PROJECTS, safeArray(sortedProjects));
        context.setVariable(ContextDataKey.SKILLS, safeArray(sortedSkillsDto));
        context.setVariable(ContextDataKey.TECHNOLOGIES, safeArray(sortedTechnologiesDto));
        context.setVariable(ContextDataKey.LANGUAGES, safeArray(sortedLanguagesDto));
        context.setVariable(ContextDataKey.CERTIFICATES, safeArray(cvDto.getCertificates()));
        context.setVariable(ContextDataKey.OTHERS, safeArray(cvDto.getOthers()));
        context.setVariable(ContextDataKey.EDUCATIONS, safeArray(sortedEducationsDto));

        return context;
    }

     private <T> List<T> safeArray(List<T> list) {
        if (list == null) {
            return new ArrayList<T>();
        }
        return list;
    }


    private String convertToXhtml(@NonNull final String html)  {
        final Tidy tidy = new Tidy();
        //do not wrap (0)
        //when using some utf chars, jtidy does not recognize elements correctly and breaks line in middle of the element
        //making xhtml invalid
        tidy.setWraplen(0);
        tidy.setInputEncoding(UTF_8);
        tidy.setOutputEncoding(UTF_8);
        tidy.setXHTML(true);
        final ByteArrayInputStream inputStream = new ByteArrayInputStream(html.getBytes(StandardCharsets.UTF_8));
        final ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        tidy.parseDOM(inputStream, outputStream);

        return outputStream.toString(StandardCharsets.UTF_8);
    }


    private String loadAvatarImage(final AvatarType avatar) {
        String avatarImageName;
        switch (avatar) {
            case MEN:
                avatarImageName = "/static/images/avatar_men.png";
                break;
            case WOMAN:
                avatarImageName = "/static/images/avatar_woman.png";
                break;
            default:
                avatarImageName = "/static/images/avatar_ghost.png";
                break;
        }
        return getImageAsBase64(avatarImageName);
    }

    private String getImageAsBase64(@NonNull final String pathToImage) {
        String data = "";
        try(InputStream is = getClass().getResourceAsStream(pathToImage)) {
            if (is != null) {
                data = "data:image/png;base64," + new String(Base64.encode(is.readAllBytes()));
            }
        } catch (IOException e) {
            log.warn("Cannot read image data");
        }

        return data;
    }

}
