package org.jhipster.collab.repository;

import org.jhipster.collab.domain.Collaborateur;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Collaborateur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CollaborateurRepository extends JpaRepository<Collaborateur, Long> {

}
