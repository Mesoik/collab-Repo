package org.jhipster.collab.repository;

import org.jhipster.collab.domain.Liste;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Liste entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ListeRepository extends JpaRepository<Liste, Long> {

}
