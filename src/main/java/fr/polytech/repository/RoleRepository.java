package fr.polytech.repository;

import fr.polytech.model.Role;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by John.
 */
public interface RoleRepository extends CrudRepository<Role, Long> {

    Iterable<Role> findAll();
}
