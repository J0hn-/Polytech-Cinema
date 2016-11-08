package fr.polytech.repository;

import fr.polytech.model.Genre;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by John.
 */
public interface GenreRepository extends CrudRepository<Genre, Long> {

    Iterable<Genre> findAll();
}
