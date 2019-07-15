package org.jhipster.collab.web.rest;

import org.jhipster.collab.CollabApp;
import org.jhipster.collab.domain.Liste;
import org.jhipster.collab.repository.ListeRepository;
import org.jhipster.collab.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static org.jhipster.collab.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link ListeResource} REST controller.
 */
@SpringBootTest(classes = CollabApp.class)
public class ListeResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ListeRepository listeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restListeMockMvc;

    private Liste liste;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ListeResource listeResource = new ListeResource(listeRepository);
        this.restListeMockMvc = MockMvcBuilders.standaloneSetup(listeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Liste createEntity(EntityManager em) {
        Liste liste = new Liste()
            .name(DEFAULT_NAME);
        return liste;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Liste createUpdatedEntity(EntityManager em) {
        Liste liste = new Liste()
            .name(UPDATED_NAME);
        return liste;
    }

    @BeforeEach
    public void initTest() {
        liste = createEntity(em);
    }

    @Test
    @Transactional
    public void createListe() throws Exception {
        int databaseSizeBeforeCreate = listeRepository.findAll().size();

        // Create the Liste
        restListeMockMvc.perform(post("/api/listes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(liste)))
            .andExpect(status().isCreated());

        // Validate the Liste in the database
        List<Liste> listeList = listeRepository.findAll();
        assertThat(listeList).hasSize(databaseSizeBeforeCreate + 1);
        Liste testListe = listeList.get(listeList.size() - 1);
        assertThat(testListe.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createListeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = listeRepository.findAll().size();

        // Create the Liste with an existing ID
        liste.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restListeMockMvc.perform(post("/api/listes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(liste)))
            .andExpect(status().isBadRequest());

        // Validate the Liste in the database
        List<Liste> listeList = listeRepository.findAll();
        assertThat(listeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = listeRepository.findAll().size();
        // set the field null
        liste.setName(null);

        // Create the Liste, which fails.

        restListeMockMvc.perform(post("/api/listes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(liste)))
            .andExpect(status().isBadRequest());

        List<Liste> listeList = listeRepository.findAll();
        assertThat(listeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllListes() throws Exception {
        // Initialize the database
        listeRepository.saveAndFlush(liste);

        // Get all the listeList
        restListeMockMvc.perform(get("/api/listes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(liste.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getListe() throws Exception {
        // Initialize the database
        listeRepository.saveAndFlush(liste);

        // Get the liste
        restListeMockMvc.perform(get("/api/listes/{id}", liste.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(liste.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingListe() throws Exception {
        // Get the liste
        restListeMockMvc.perform(get("/api/listes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateListe() throws Exception {
        // Initialize the database
        listeRepository.saveAndFlush(liste);

        int databaseSizeBeforeUpdate = listeRepository.findAll().size();

        // Update the liste
        Liste updatedListe = listeRepository.findById(liste.getId()).get();
        // Disconnect from session so that the updates on updatedListe are not directly saved in db
        em.detach(updatedListe);
        updatedListe
            .name(UPDATED_NAME);

        restListeMockMvc.perform(put("/api/listes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedListe)))
            .andExpect(status().isOk());

        // Validate the Liste in the database
        List<Liste> listeList = listeRepository.findAll();
        assertThat(listeList).hasSize(databaseSizeBeforeUpdate);
        Liste testListe = listeList.get(listeList.size() - 1);
        assertThat(testListe.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingListe() throws Exception {
        int databaseSizeBeforeUpdate = listeRepository.findAll().size();

        // Create the Liste

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restListeMockMvc.perform(put("/api/listes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(liste)))
            .andExpect(status().isBadRequest());

        // Validate the Liste in the database
        List<Liste> listeList = listeRepository.findAll();
        assertThat(listeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteListe() throws Exception {
        // Initialize the database
        listeRepository.saveAndFlush(liste);

        int databaseSizeBeforeDelete = listeRepository.findAll().size();

        // Delete the liste
        restListeMockMvc.perform(delete("/api/listes/{id}", liste.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Liste> listeList = listeRepository.findAll();
        assertThat(listeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Liste.class);
        Liste liste1 = new Liste();
        liste1.setId(1L);
        Liste liste2 = new Liste();
        liste2.setId(liste1.getId());
        assertThat(liste1).isEqualTo(liste2);
        liste2.setId(2L);
        assertThat(liste1).isNotEqualTo(liste2);
        liste1.setId(null);
        assertThat(liste1).isNotEqualTo(liste2);
    }
}
