package org.jhipster.collab.web.rest;

import org.jhipster.collab.domain.Liste;
import org.jhipster.collab.repository.ListeRepository;
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
 * REST controller for managing {@link org.jhipster.collab.domain.Liste}.
 */
@RestController
@RequestMapping("/api")
public class ListeResource {

    private final Logger log = LoggerFactory.getLogger(ListeResource.class);

    private static final String ENTITY_NAME = "liste";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ListeRepository listeRepository;

    public ListeResource(ListeRepository listeRepository) {
        this.listeRepository = listeRepository;
    }

    /**
     * {@code POST  /listes} : Create a new liste.
     *
     * @param liste the liste to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new liste, or with status {@code 400 (Bad Request)} if the liste has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/listes")
    public ResponseEntity<Liste> createListe(@Valid @RequestBody Liste liste) throws URISyntaxException {
        log.debug("REST request to save Liste : {}", liste);
        if (liste.getId() != null) {
            throw new BadRequestAlertException("A new liste cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Liste result = listeRepository.save(liste);
        return ResponseEntity.created(new URI("/api/listes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /listes} : Updates an existing liste.
     *
     * @param liste the liste to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated liste,
     * or with status {@code 400 (Bad Request)} if the liste is not valid,
     * or with status {@code 500 (Internal Server Error)} if the liste couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/listes")
    public ResponseEntity<Liste> updateListe(@Valid @RequestBody Liste liste) throws URISyntaxException {
        log.debug("REST request to update Liste : {}", liste);
        if (liste.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Liste result = listeRepository.save(liste);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, liste.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /listes} : get all the listes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of listes in body.
     */
    @GetMapping("/listes")
    public List<Liste> getAllListes() {
        log.debug("REST request to get all Listes");
        return listeRepository.findAll();
    }

    /**
     * {@code GET  /listes/:id} : get the "id" liste.
     *
     * @param id the id of the liste to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the liste, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/listes/{id}")
    public ResponseEntity<Liste> getListe(@PathVariable Long id) {
        log.debug("REST request to get Liste : {}", id);
        Optional<Liste> liste = listeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(liste);
    }

    /**
     * {@code DELETE  /listes/:id} : delete the "id" liste.
     *
     * @param id the id of the liste to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/listes/{id}")
    public ResponseEntity<Void> deleteListe(@PathVariable Long id) {
        log.debug("REST request to delete Liste : {}", id);
        listeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
