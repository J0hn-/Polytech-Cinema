package fr.polytech.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by John.
 */
@Entity
public class Director {

    @Id
    @Column(name = "director_id", nullable = false)
    private Long id;

    @Column(name = "first_name", nullable = false, length = 20)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 20)
    private String lastName;

    @OneToMany(mappedBy = "director", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private Collection<Movie> movies;
}
