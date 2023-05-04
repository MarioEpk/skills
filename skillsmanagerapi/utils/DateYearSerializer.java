package com.skillsmanagerapi.utils;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class DateYearSerializer extends StdSerializer<Date> {

    private final transient SimpleDateFormat formatter = new SimpleDateFormat("yyyy");

    public DateYearSerializer() {
        this(null);
    }

    public DateYearSerializer(Class<Date> t) {
        super(t);
    }


    @Override
    public void serialize(Date value,
                          JsonGenerator jsonGenerator,
                          SerializerProvider provider) throws IOException {
        if (value != null) {
            jsonGenerator.writeObject(formatter.format(value));
        }

    }
}
