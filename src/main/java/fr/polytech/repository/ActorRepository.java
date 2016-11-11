package fr.polytech.repository;

import fr.polytech.model.Actor;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by John.
 */
public interface ActorRepository extends CrudRepository<Actor, Long> {

    Iterable<Actor> findAll();
}