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
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonManagedReference
    @Column(name = "review_id", nullable = false)
    private Long id;

    @Column(name = "creation", nullable = false)
    @JsonManagedReference
    private Date creation;

    @Column(name = "rating", nullable = true)
    @JsonManagedReference
    private Byte rating;

    @JsonManagedReference
    private String comment;

    @Column(name = "author", nullable = true, length = 25)
    @JsonManagedReference
    private String author;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id")
    @JsonManagedReference
    private Movie movie;
}
