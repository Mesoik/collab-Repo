package org.jhipster.collab.web.rest;

import org.jhipster.collab.domain.Certifie;
import org.jhipster.collab.repository.CertifieRepository;
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
 * REST controller for managing {@link org.jhipster.collab.domain.Certifie}.
 */
@RestController
@RequestMapping("/api")
public class CertifieResource {

    private final Logger log = LoggerFactory.getLogger(CertifieResource.class);

    private static final String ENTITY_NAME = "certifie";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CertifieRepository certifieRepository;

    public CertifieResource(CertifieRepository certifieRepository) {
        this.certifieRepository = certifieRepository;
    }

    /**
     * {@code POST  /certifies} : Create a new certifie.
     *
     * @param certifie the certifie to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new certifie, or with status {@code 400 (Bad Request)} if the certifie has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/certifies")
    public ResponseEntity<Certifie> createCertifie(@Valid @RequestBody Certifie certifie) throws URISyntaxException {
        log.debug("REST request to save Certifie : {}", certifie);
        if (certifie.getId() != null) {
            throw new BadRequestAlertException("A new certifie cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Certifie result = certifieRepository.save(certifie);
        return ResponseEntity.created(new URI("/api/certifies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /certifies} : Updates an existing certifie.
     *
     * @param certifie the certifie to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated certifie,
     * or with status {@code 400 (Bad Request)} if the certifie is not valid,
     * or with status {@code 500 (Internal Server Error)} if the certifie couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/certifies")
    public ResponseEntity<Certifie> updateCertifie(@Valid @RequestBody Certifie certifie) throws URISyntaxException {
        log.debug("REST request to update Certifie : {}", certifie);
        if (certifie.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Certifie result = certifieRepository.save(certifie);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, certifie.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /certifies} : get all the certifies.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of certifies in body.
     */
    @GetMapping("/certifies")
    public List<Certifie> getAllCertifies() {
        log.debug("REST request to get all Certifies");
        return certifieRepository.findAll();
    }

    /**
     * {@code GET  /certifies/:id} : get the "id" certifie.
     *
     * @param id the id of the certifie to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the certifie, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/certifies/{id}")
    public ResponseEntity<Certifie> getCertifie(@PathVariable Long id) {
        log.debug("REST request to get Certifie : {}", id);
        Optional<Certifie> certifie = certifieRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(certifie);
    }

    /**
     * {@code DELETE  /certifies/:id} : delete the "id" certifie.
     *
     * @param id the id of the certifie to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/certifies/{id}")
    public ResponseEntity<Void> deleteCertifie(@PathVariable Long id) {
        log.debug("REST request to delete Certifie : {}", id);
        certifieRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
