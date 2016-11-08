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
    @Column(name = "movie_id", nullable = false)
    private Long id;

    @Column(name = "title", nullable = false, length = 30)
    private String title;

    @Column(name = "duration", nullable = false)
    private short duration;

    @Column(name = "release_date", nullable = false)
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
