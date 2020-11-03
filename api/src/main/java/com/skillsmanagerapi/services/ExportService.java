package com.skillsmanagerapi.services;

import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

import static com.itextpdf.text.pdf.BaseFont.CP1250;
import static com.itextpdf.text.pdf.BaseFont.EMBEDDED;
import static org.thymeleaf.templatemode.TemplateMode.HTML;
import org.thymeleaf.context.Context;
import org.w3c.tidy.Tidy;
import org.xhtmlrenderer.pdf.ITextRenderer;

import com.skillsmanagerapi.dto.CvDto;
import com.skillsmanagerapi.dto.LanguageDto;
import com.skillsmanagerapi.dto.ProjectDto;
import com.skillsmanagerapi.dto.SkillDto;
import com.skillsmanagerapi.dto.TechnologyDto;
import com.skillsmanagerapi.enums.AvatarType;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.nio.file.FileSystems;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import lombok.NonNull;

@Service
public class ExportService {

    private static final String UTF_8 = "UTF-8";

    public byte[] generateCvPdf(@NonNull final CvDto cvDto) throws Exception {

        // We set-up a Thymeleaf rendering engine. All Thymeleaf templates
        // are HTML-based files located under "src/test/resources/templates".
        // If you want to add templates into file, just change prefix
        ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
        templateResolver.setPrefix("/templates/");
        templateResolver.setSuffix(".html");
        templateResolver.setTemplateMode(HTML);
        templateResolver.setCharacterEncoding(UTF_8);

        TemplateEngine templateEngine = new TemplateEngine();
        templateEngine.setTemplateResolver(templateResolver);

        // Variables inside context will be used in template
        Context context = this.addCvIntoContext(cvDto);

        // Flying Saucer needs XHTML - not just normal HTML. To make our life
        // easy, use JTidy to convert the rendered Thymeleaf template to
        // XHTML.
        // Note that this might not work for very complicated HTML. But
        // it's good enough for a simple pdf.
        String renderedHtmlContent = templateEngine.process("pdf", context);
        String xHtml = convertToXhtml(renderedHtmlContent);

        ITextRenderer renderer = new ITextRenderer();
        renderer.getFontResolver().addFont("static/fonts/Montserrat-Light.ttf", CP1250, EMBEDDED);
        renderer.getFontResolver().addFont("static/fonts/Montserrat-ExtraBold.ttf", CP1250, EMBEDDED);
        renderer.getFontResolver().addFont("static/fonts/Montserrat-Medium.ttf", CP1250, EMBEDDED);
        renderer.getFontResolver().addFont("static/fonts/Montserrat-SemiBold.ttf", CP1250, EMBEDDED);

        String baseUrl = FileSystems
                .getDefault()
                .getPath("api","src", "main", "resources")
                .toUri()
                .toURL()
                .toString();

        renderer.setDocumentFromString(xHtml, baseUrl);
        renderer.layout();

        // And finally, we create the PDF:
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            renderer.createPDF(outputStream);

            return outputStream.toByteArray();
        }
    }

    private Context addCvIntoContext(@NonNull final CvDto cvDto) {
        Context context = new Context();

        List<SkillDto> sortedSkillsDto = cvDto.getSkills().stream().sorted().collect(Collectors.toList());
        List<TechnologyDto> sortedTechnologiesDto = cvDto.getTechnologies().stream().sorted().collect(Collectors.toList());
        List<LanguageDto> sortedLanguagesDto = cvDto.getLanguages().stream().sorted().collect(Collectors.toList());
        List<ProjectDto> sortedProjects = cvDto.getProjects().stream().sorted().collect(Collectors.toList());

        context.setVariable("avatarTypeMen", AvatarType.MEN);
        context.setVariable("avatarTypeWoman", AvatarType.WOMAN);

        context.setVariable("avatar", cvDto.getAvatar());
        context.setVariable("user", cvDto.getUser());
        context.setVariable("positions", cvDto.getPositions());
        context.setVariable("profile", cvDto.getProfile());
        context.setVariable("projects", sortedProjects);
        context.setVariable("skills", sortedSkillsDto);
        context.setVariable("technologies", sortedTechnologiesDto);
        context.setVariable("languages", sortedLanguagesDto);
        context.setVariable("certificates", cvDto.getCertificates());
        context.setVariable("others", cvDto.getOthers());

        return context;
    }


    private String convertToXhtml(@NonNull final String html) throws UnsupportedEncodingException {
        Tidy tidy = new Tidy();
        tidy.setInputEncoding(UTF_8);
        tidy.setOutputEncoding(UTF_8);
        tidy.setXHTML(true);
        ByteArrayInputStream inputStream = new ByteArrayInputStream(html.getBytes(StandardCharsets.UTF_8));
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        tidy.parseDOM(inputStream, outputStream);

        return outputStream.toString(UTF_8);
    }


}
