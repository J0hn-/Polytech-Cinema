package fr.polytech.repository;

import fr.polytech.model.Review;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by John.
 */
public interface ReviewRepository extends CrudRepository<Review, Long> {

    Iterable<Review> findAll();
}