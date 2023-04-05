package com.skillsmanagerapi.utils;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class DateYearDeserializer extends StdDeserializer<Date> {
    private final transient SimpleDateFormat formatter = new SimpleDateFormat("yyyy");


    public DateYearDeserializer() {
        this(null);
    }
    public DateYearDeserializer(Class<Date> date) {
        super(date);
    }

    @Override
    public Date deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        String value = p.getValueAsString();
        if (value != null) {
            try {
                return formatter.parse(value);
            } catch (ParseException e) {
                log.warn("Cannot deserialize date {} to yyyy", value);
            }
        }
        return null;
    }

}
