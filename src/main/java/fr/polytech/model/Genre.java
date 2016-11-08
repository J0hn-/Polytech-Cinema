package fr.polytech.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by John.
 */
@Entity
public class Genre {

    @Id
    @Column(name = "genre_id", nullable = false)
    @JsonManagedReference
    private Long id;

    @Column(name = "title", nullable = false, length = 20)
    @JsonManagedReference
    private String title;

    @OneToMany(mappedBy = "genre", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private Collection<Movie> movies;
}
