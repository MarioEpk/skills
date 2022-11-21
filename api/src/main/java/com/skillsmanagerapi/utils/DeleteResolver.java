package com.skillsmanagerapi.utils;

import com.skillsmanagerapi.models.Certificate;
import com.skillsmanagerapi.models.Cv;
import com.skillsmanagerapi.models.Education;
import com.skillsmanagerapi.models.Language;
import com.skillsmanagerapi.models.Other;
import com.skillsmanagerapi.models.Skill;
import com.skillsmanagerapi.models.Technology;
import com.skillsmanagerapi.repositories.CvRepository;
import com.skillsmanagerapi.services.DeleteTypeConstraintException;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.BiFunction;
import java.util.function.Function;

@Component
public class DeleteResolver {

    private final CvRepository cvRepository;

    @Autowired
    public DeleteResolver(@NonNull final CvRepository cvRepository) {
        this.cvRepository = cvRepository;
    }

    public <T> void checkOrResolve(int idToRemove,
                                   boolean checkOnly,
                                   BiFunction<CvRepository, Integer, List<Cv>> findRelatedCvsFunction,
                                   Function<Cv, List<T>> dataFunction,
                                   Function<T, Integer> idFunction
                                   ) throws DeleteTypeConstraintException {

        List<Cv> cvList = findRelatedCvsFunction.apply(cvRepository, idToRemove);
        if (!cvList.isEmpty()) {
            if (checkOnly) {
                throw new DeleteTypeConstraintException();
            }


            cvList.forEach(cv -> {
                dataFunction.apply(cv).removeIf(r -> idFunction.apply(r) == idToRemove);
            });
            cvRepository.saveAll(cvList);
        }
    }

    private int getId(Object r) {
        if (r instanceof Skill) {
            return ((Skill) r).getId();
        } else if (r instanceof Education) {
            return ((Education) r).getId();
        } else if (r instanceof Language) {
            return ((Language) r).getId();
        } else if (r instanceof Technology) {
            return ((Technology) r).getId();
        } else if (r instanceof Other) {
            return ((Other) r).getId();
        } else if (r instanceof Certificate) {
            return ((Certificate) r).getId();
        }
        return -1;
    }

}
