package com.skillsmanagerapi.utils;

import com.skillsmanagerapi.models.Cv;
import com.skillsmanagerapi.models.ProjectType;
import com.skillsmanagerapi.models.TechnologyType;
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
import java.util.function.Function;

@Component
public class DeleteResolver {

    private final ApplicationContext context;

    @Autowired
    public DeleteResolver(ApplicationContext context) {
        this.context = context;
    }


    /**
     * @param jpaClassName classname of repository
     * @param findRecordsFunction repository finder method returns all parent records containing reference to deleted record
     * @param getterFunction parent getter function, which returns list of all referenced records
     * @param idFunction getter function to get id from reference record
     * @param idToRemove id of record to remove
     * @param forceDelete forceDelete
     * @throws DeleteTypeConstraintException
     */
    public <S extends JpaRepository<T,Integer>, T, U> void resolveConstraints(
            Class<S> jpaClassName,
            BiFunction<S, Integer, List<T>> findRecordsFunction,
            Function<T, List<U>> getterFunction,
            Function<U, Integer> idFunction,
            int idToRemove,
            boolean forceDelete) throws DeleteTypeConstraintException {


        //find all records, which reference record to be deleted
        S joinTableRepository = context.getBean(jpaClassName, JpaRepository.class);
        List<T> records = findRecordsFunction.apply(joinTableRepository, idToRemove);
        if (records.size() > 0) {
            if (!forceDelete) {
                throw new DeleteTypeConstraintException();
            }


            //m:n table does not have explicit entity class
            //first,  iterate over all records and call getter method to get List of referenced records
            //then, remove records with id=idToRemove (using idFunction) from list
            //and finally, save "parent" record with updated list
            records.forEach(rec -> {
                getterFunction.apply(rec).removeIf(item -> idFunction.apply(item) == idToRemove);
            });
            joinTableRepository.saveAll(records);

        }
    }


     /**@param jpaClassName classname of repository
     *  @param findRecordsFunction repository finder method returns all parent records containing reference to deleted record
     *  @param idToRemove id of record to remove
     *  @param forceDelete forceDelete
     */
    public <T, S extends JpaRepository<T,Integer>> void resolveConstraints(
            Class<S> jpaClassName,
            BiFunction<S, Integer, List<T>> findRecordsFunction,
            int idToRemove,
            boolean forceDelete) throws DeleteTypeConstraintException {

        //find all records, which reference record to be deleted
        S joinTableRepository = context.getBean(jpaClassName, JpaRepository.class);
        List<T> records = findRecordsFunction.apply(joinTableRepository, idToRemove);
        if (records.size() > 0) {
            if (!forceDelete) {
                throw new DeleteTypeConstraintException();
            }

            //if force delete, remove references from explicit join table
            joinTableRepository.deleteAll(records);
        }
    }


}
