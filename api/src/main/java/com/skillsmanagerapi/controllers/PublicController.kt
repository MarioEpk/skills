package com.skillsmanagerapi.controllers

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

@RestController
class PublicController {
    @RequestMapping(value = ["/"], method = [RequestMethod.GET])
    fun hello(): String {
        return "Hello world"
    }
}
