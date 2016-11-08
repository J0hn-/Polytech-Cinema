package fr.polytech.model;

import javax.persistence.*;
import java.sql.Date;
import java.util.Collection;

/**
 * Created by John.
 */
@Entity
public class Actor {

    @Id
    @Column(name = "actor_id", nullable = false)
    private Long id;

    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @Column(name = "last_name", nullable = true, length = 50)
    private String lastName;

    @Column(name = "birthday", nullable = true)
    private Date birthday;

    @Column(name = "deathday", nullable = true)
    private Date deathday;

    @OneToMany(mappedBy = "actor", cascade = CascadeType.REMOVE)
    private Collection<Role> roles;
}
