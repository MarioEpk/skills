package com.skillsmanagerapi.controllers

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

@RequestMapping(value = ["/skills"])
@RestController
class SkillsController {
    @RequestMapping(value = [""], method = [RequestMethod.GET])
    fun hello(): String {
        return "Skills"
    }
}
