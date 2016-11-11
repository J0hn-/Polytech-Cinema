package fr.polytech.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.sql.Date;
import java.util.Collection;

/**
 * Created by John.
 */
@Entity
public class Actor {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "actor_id", nullable = false)
    @JsonManagedReference
    private Long id;

    @Column(name = "first_name", nullable = false, length = 50)
    @JsonManagedReference
    private String firstName;

    @Column(name = "last_name", nullable = true, length = 50)
    @JsonManagedReference
    private String lastName;

    @Column(name = "birthday", nullable = true)
    @JsonManagedReference
    private Date birthday;

    @Column(name = "deathday", nullable = true)
    @JsonManagedReference
    private Date deathday;

    @OneToMany(mappedBy = "actor", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private Collection<Role> roles;
}
