package org.jhipster.collab.web.rest;

import org.jhipster.collab.CollabApp;
import org.jhipster.collab.domain.Collaborateur;
import org.jhipster.collab.repository.CollaborateurRepository;
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
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.jhipster.collab.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link CollaborateurResource} REST controller.
 */
@SpringBootTest(classes = CollabApp.class)
public class CollaborateurResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private CollaborateurRepository collaborateurRepository;

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

    private MockMvc restCollaborateurMockMvc;

    private Collaborateur collaborateur;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CollaborateurResource collaborateurResource = new CollaborateurResource(collaborateurRepository);
        this.restCollaborateurMockMvc = MockMvcBuilders.standaloneSetup(collaborateurResource)
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
    public static Collaborateur createEntity(EntityManager em) {
        Collaborateur collaborateur = new Collaborateur()
            .name(DEFAULT_NAME)
            .content(DEFAULT_CONTENT)
            .date(DEFAULT_DATE);
        return collaborateur;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Collaborateur createUpdatedEntity(EntityManager em) {
        Collaborateur collaborateur = new Collaborateur()
            .name(UPDATED_NAME)
            .content(UPDATED_CONTENT)
            .date(UPDATED_DATE);
        return collaborateur;
    }

    @BeforeEach
    public void initTest() {
        collaborateur = createEntity(em);
    }

    @Test
    @Transactional
    public void createCollaborateur() throws Exception {
        int databaseSizeBeforeCreate = collaborateurRepository.findAll().size();

        // Create the Collaborateur
        restCollaborateurMockMvc.perform(post("/api/collaborateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(collaborateur)))
            .andExpect(status().isCreated());

        // Validate the Collaborateur in the database
        List<Collaborateur> collaborateurList = collaborateurRepository.findAll();
        assertThat(collaborateurList).hasSize(databaseSizeBeforeCreate + 1);
        Collaborateur testCollaborateur = collaborateurList.get(collaborateurList.size() - 1);
        assertThat(testCollaborateur.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCollaborateur.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testCollaborateur.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createCollaborateurWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = collaborateurRepository.findAll().size();

        // Create the Collaborateur with an existing ID
        collaborateur.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCollaborateurMockMvc.perform(post("/api/collaborateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(collaborateur)))
            .andExpect(status().isBadRequest());

        // Validate the Collaborateur in the database
        List<Collaborateur> collaborateurList = collaborateurRepository.findAll();
        assertThat(collaborateurList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = collaborateurRepository.findAll().size();
        // set the field null
        collaborateur.setName(null);

        // Create the Collaborateur, which fails.

        restCollaborateurMockMvc.perform(post("/api/collaborateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(collaborateur)))
            .andExpect(status().isBadRequest());

        List<Collaborateur> collaborateurList = collaborateurRepository.findAll();
        assertThat(collaborateurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = collaborateurRepository.findAll().size();
        // set the field null
        collaborateur.setDate(null);

        // Create the Collaborateur, which fails.

        restCollaborateurMockMvc.perform(post("/api/collaborateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(collaborateur)))
            .andExpect(status().isBadRequest());

        List<Collaborateur> collaborateurList = collaborateurRepository.findAll();
        assertThat(collaborateurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCollaborateurs() throws Exception {
        // Initialize the database
        collaborateurRepository.saveAndFlush(collaborateur);

        // Get all the collaborateurList
        restCollaborateurMockMvc.perform(get("/api/collaborateurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(collaborateur.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getCollaborateur() throws Exception {
        // Initialize the database
        collaborateurRepository.saveAndFlush(collaborateur);

        // Get the collaborateur
        restCollaborateurMockMvc.perform(get("/api/collaborateurs/{id}", collaborateur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(collaborateur.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCollaborateur() throws Exception {
        // Get the collaborateur
        restCollaborateurMockMvc.perform(get("/api/collaborateurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCollaborateur() throws Exception {
        // Initialize the database
        collaborateurRepository.saveAndFlush(collaborateur);

        int databaseSizeBeforeUpdate = collaborateurRepository.findAll().size();

        // Update the collaborateur
        Collaborateur updatedCollaborateur = collaborateurRepository.findById(collaborateur.getId()).get();
        // Disconnect from session so that the updates on updatedCollaborateur are not directly saved in db
        em.detach(updatedCollaborateur);
        updatedCollaborateur
            .name(UPDATED_NAME)
            .content(UPDATED_CONTENT)
            .date(UPDATED_DATE);

        restCollaborateurMockMvc.perform(put("/api/collaborateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCollaborateur)))
            .andExpect(status().isOk());

        // Validate the Collaborateur in the database
        List<Collaborateur> collaborateurList = collaborateurRepository.findAll();
        assertThat(collaborateurList).hasSize(databaseSizeBeforeUpdate);
        Collaborateur testCollaborateur = collaborateurList.get(collaborateurList.size() - 1);
        assertThat(testCollaborateur.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCollaborateur.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testCollaborateur.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingCollaborateur() throws Exception {
        int databaseSizeBeforeUpdate = collaborateurRepository.findAll().size();

        // Create the Collaborateur

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCollaborateurMockMvc.perform(put("/api/collaborateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(collaborateur)))
            .andExpect(status().isBadRequest());

        // Validate the Collaborateur in the database
        List<Collaborateur> collaborateurList = collaborateurRepository.findAll();
        assertThat(collaborateurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCollaborateur() throws Exception {
        // Initialize the database
        collaborateurRepository.saveAndFlush(collaborateur);

        int databaseSizeBeforeDelete = collaborateurRepository.findAll().size();

        // Delete the collaborateur
        restCollaborateurMockMvc.perform(delete("/api/collaborateurs/{id}", collaborateur.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Collaborateur> collaborateurList = collaborateurRepository.findAll();
        assertThat(collaborateurList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Collaborateur.class);
        Collaborateur collaborateur1 = new Collaborateur();
        collaborateur1.setId(1L);
        Collaborateur collaborateur2 = new Collaborateur();
        collaborateur2.setId(collaborateur1.getId());
        assertThat(collaborateur1).isEqualTo(collaborateur2);
        collaborateur2.setId(2L);
        assertThat(collaborateur1).isNotEqualTo(collaborateur2);
        collaborateur1.setId(null);
        assertThat(collaborateur1).isNotEqualTo(collaborateur2);
    }
}
