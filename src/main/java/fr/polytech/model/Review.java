package fr.polytech.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.sql.Date;

/**
 * Created by John.
 */
@Entity
public class Review {

    @Id
    @Column(name = "review_id", nullable = false)
    private Long id;

    @Column(name = "creation", nullable = false)
    private Date creation;

    @Column(name = "rating", nullable = true)
    private Byte rating;

    private String comment;

    @Column(name = "author", nullable = true, length = 25)
    private String author;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id")
    @JsonManagedReference
    private Movie movie;
}
