package fr.polytech.repository;

import fr.polytech.model.Movie;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by John.
 */
public interface MovieRepository extends CrudRepository<Movie, Long> {

    Iterable<Movie> findAll();
}