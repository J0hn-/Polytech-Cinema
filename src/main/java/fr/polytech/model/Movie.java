package fr.polytech.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.sql.Date;
import java.util.Collection;

/**
 * Created by John.
 */
@Entity
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "movie_id", nullable = false)
    @JsonManagedReference
    private Long id;

    @Column(name = "title", nullable = false, length = 30)
    @JsonManagedReference
    private String title;

    @Column(name = "duration", nullable = false)
    @JsonManagedReference
    private short duration;

    @Column(name = "release_date", nullable = false)
    @JsonManagedReference
    private Date releaseDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "director_id")
    @JsonManagedReference
    private Director director;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "genre_id")
    @JsonManagedReference
    private Genre genre;

    @OneToMany(mappedBy = "movie", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private Collection<Review> reviews;

    @OneToMany(mappedBy = "movie", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private Collection<Role> roles;
}
