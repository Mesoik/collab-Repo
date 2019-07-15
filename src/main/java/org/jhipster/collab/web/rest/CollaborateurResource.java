package org.jhipster.collab.web.rest;

import org.jhipster.collab.domain.Collaborateur;
import org.jhipster.collab.repository.CollaborateurRepository;
import org.jhipster.collab.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link org.jhipster.collab.domain.Collaborateur}.
 */
@RestController
@RequestMapping("/api")
public class CollaborateurResource {

    private final Logger log = LoggerFactory.getLogger(CollaborateurResource.class);

    private static final String ENTITY_NAME = "collaborateur";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CollaborateurRepository collaborateurRepository;

    public CollaborateurResource(CollaborateurRepository collaborateurRepository) {
        this.collaborateurRepository = collaborateurRepository;
    }

    /**
     * {@code POST  /collaborateurs} : Create a new collaborateur.
     *
     * @param collaborateur the collaborateur to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new collaborateur, or with status {@code 400 (Bad Request)} if the collaborateur has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/collaborateurs")
    public ResponseEntity<Collaborateur> createCollaborateur(@Valid @RequestBody Collaborateur collaborateur) throws URISyntaxException {
        log.debug("REST request to save Collaborateur : {}", collaborateur);
        if (collaborateur.getId() != null) {
            throw new BadRequestAlertException("A new collaborateur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Collaborateur result = collaborateurRepository.save(collaborateur);
        return ResponseEntity.created(new URI("/api/collaborateurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /collaborateurs} : Updates an existing collaborateur.
     *
     * @param collaborateur the collaborateur to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated collaborateur,
     * or with status {@code 400 (Bad Request)} if the collaborateur is not valid,
     * or with status {@code 500 (Internal Server Error)} if the collaborateur couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/collaborateurs")
    public ResponseEntity<Collaborateur> updateCollaborateur(@Valid @RequestBody Collaborateur collaborateur) throws URISyntaxException {
        log.debug("REST request to update Collaborateur : {}", collaborateur);
        if (collaborateur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Collaborateur result = collaborateurRepository.save(collaborateur);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, collaborateur.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /collaborateurs} : get all the collaborateurs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of collaborateurs in body.
     */
    @GetMapping("/collaborateurs")
    public List<Collaborateur> getAllCollaborateurs() {
        log.debug("REST request to get all Collaborateurs");
        return collaborateurRepository.findAll();
    }

    /**
     * {@code GET  /collaborateurs/:id} : get the "id" collaborateur.
     *
     * @param id the id of the collaborateur to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the collaborateur, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/collaborateurs/{id}")
    public ResponseEntity<Collaborateur> getCollaborateur(@PathVariable Long id) {
        log.debug("REST request to get Collaborateur : {}", id);
        Optional<Collaborateur> collaborateur = collaborateurRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(collaborateur);
    }

    /**
     * {@code DELETE  /collaborateurs/:id} : delete the "id" collaborateur.
     *
     * @param id the id of the collaborateur to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/collaborateurs/{id}")
    public ResponseEntity<Void> deleteCollaborateur(@PathVariable Long id) {
        log.debug("REST request to delete Collaborateur : {}", id);
        collaborateurRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
