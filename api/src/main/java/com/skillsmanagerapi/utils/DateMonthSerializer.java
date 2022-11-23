package com.skillsmanagerapi.utils;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Slf4j
public class DateMonthSerializer extends StdSerializer<Date> {

    private final transient SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM");

    public DateMonthSerializer() {
        this(null);
    }

    public DateMonthSerializer(Class<Date> t) {
        super(t);
    }


    @Override
    public void serialize(Date value,
                          JsonGenerator jsonGenerator,
                          SerializerProvider provider) throws IOException, JsonProcessingException {
        if (value != null) {
            jsonGenerator.writeObject(formatter.format(value));
        }

    }
}
