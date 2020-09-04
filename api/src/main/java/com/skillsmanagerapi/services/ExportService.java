package com.skillsmanagerapi.services;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

import static com.itextpdf.text.pdf.BaseFont.CP1250;
import static com.itextpdf.text.pdf.BaseFont.EMBEDDED;
import static com.itextpdf.text.pdf.BaseFont.IDENTITY_H;
import static com.itextpdf.text.pdf.BaseFont.NOT_EMBEDDED;
import static org.thymeleaf.templatemode.TemplateMode.HTML;
import org.thymeleaf.context.Context;
import org.w3c.dom.Document;
import org.w3c.tidy.Tidy;
import org.xhtmlrenderer.pdf.ITextRenderer;

import com.skillsmanagerapi.dto.CvDto;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.nio.file.FileSystems;
import java.nio.file.Path;

import javax.servlet.http.HttpServletRequest;

@Service
public class ExportService {

    private static final String UTF_8 = "UTF-8";

    public byte[] generateCvPdf(CvDto cvDto) throws Exception {

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
        Context context = new Context();
        context.setVariable("profile", cvDto.getProfile());
        context.setVariable("user", cvDto.getUser());

        // Flying Saucer needs XHTML - not just normal HTML. To make our life
        // easy, use JTidy to convert the rendered Thymeleaf template to
        // XHTML.Note that this might not work for very complicated HTML. But
        // it's good enough for a simple pdf.
        String renderedHtmlContent = templateEngine.process("pdf", context);
        String xHtml = convertToXhtml(renderedHtmlContent);

        ITextRenderer renderer = new ITextRenderer();
        renderer.getFontResolver().addFont("static/fonts/Montserrat-Light.ttf", CP1250, EMBEDDED);

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
//            renderer.finishPDF();
            return outputStream.toByteArray();
        }
    }


    private String convertToXhtml(String html) throws UnsupportedEncodingException {
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
