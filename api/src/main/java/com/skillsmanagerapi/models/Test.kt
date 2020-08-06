package com.skillsmanagerapi.models

import javax.persistence.*

@Entity
class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private val id = 0

    @Column(nullable = false)
    private val name: String? = null
}
