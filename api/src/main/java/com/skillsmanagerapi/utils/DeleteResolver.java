package com.skillsmanagerapi.utils;

import com.skillsmanagerapi.models.Cv;
import com.skillsmanagerapi.repositories.CvRepository;
import com.skillsmanagerapi.repositories.SkillRepository;
import com.skillsmanagerapi.services.DeleteTypeConstraintException;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.function.BiFunction;

@Component
public class DeleteResolver {

    private final ApplicationContext context;
    private final CvRepository cvRepository;

    @Autowired
    public DeleteResolver(ApplicationContext context, @NonNull final CvRepository cvRepository) {
        this.context = context;
        this.cvRepository = cvRepository;
    }


    public <T, S extends JpaRepository<T,Integer>> void resolveConstraints(
            Class<S> jpaClassName,
            BiFunction<S, Integer, Long> countFunction,
            int idToRemove) throws DeleteTypeConstraintException {
        S joinTableRepository = context.getBean(jpaClassName, JpaRepository.class);
        long count = countFunction.apply(joinTableRepository, idToRemove);
        System.out.println("-----" + count);
    }


        //???@Transactional
    public <T, S extends JpaRepository<T,Integer>> void resolveConstraints(
            Class<S> jpaClassName,
            BiFunction<S, Integer, List<T>> dataFunction,
            int idToRemove,
            boolean forceDelete) throws DeleteTypeConstraintException {

        //check if there are join records
        S joinTableRepository = context.getBean(jpaClassName, JpaRepository.class);
        List<T> records = dataFunction.apply(joinTableRepository, idToRemove);
        if (records.size() > 0) {
            if (!forceDelete) {
                throw new DeleteTypeConstraintException();
            }

            //remove join table records
            joinTableRepository.deleteAll(records);
        }
    }


}
