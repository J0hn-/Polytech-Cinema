package fr.polytech.repository;

import fr.polytech.model.Director;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by John.
 */
public interface DirectorRepository extends CrudRepository<Director, Long> {

    Iterable<Director> findAll();
}