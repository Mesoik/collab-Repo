package org.jhipster.collab.web.rest;

import org.jhipster.collab.CollabApp;
import org.jhipster.collab.domain.Certifie;
import org.jhipster.collab.repository.CertifieRepository;
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
 * Integration tests for the {@Link CertifieResource} REST controller.
 */
@SpringBootTest(classes = CollabApp.class)
public class CertifieResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private CertifieRepository certifieRepository;

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

    private MockMvc restCertifieMockMvc;

    private Certifie certifie;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CertifieResource certifieResource = new CertifieResource(certifieRepository);
        this.restCertifieMockMvc = MockMvcBuilders.standaloneSetup(certifieResource)
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
    public static Certifie createEntity(EntityManager em) {
        Certifie certifie = new Certifie()
            .name(DEFAULT_NAME);
        return certifie;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Certifie createUpdatedEntity(EntityManager em) {
        Certifie certifie = new Certifie()
            .name(UPDATED_NAME);
        return certifie;
    }

    @BeforeEach
    public void initTest() {
        certifie = createEntity(em);
    }

    @Test
    @Transactional
    public void createCertifie() throws Exception {
        int databaseSizeBeforeCreate = certifieRepository.findAll().size();

        // Create the Certifie
        restCertifieMockMvc.perform(post("/api/certifies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(certifie)))
            .andExpect(status().isCreated());

        // Validate the Certifie in the database
        List<Certifie> certifieList = certifieRepository.findAll();
        assertThat(certifieList).hasSize(databaseSizeBeforeCreate + 1);
        Certifie testCertifie = certifieList.get(certifieList.size() - 1);
        assertThat(testCertifie.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createCertifieWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = certifieRepository.findAll().size();

        // Create the Certifie with an existing ID
        certifie.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCertifieMockMvc.perform(post("/api/certifies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(certifie)))
            .andExpect(status().isBadRequest());

        // Validate the Certifie in the database
        List<Certifie> certifieList = certifieRepository.findAll();
        assertThat(certifieList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = certifieRepository.findAll().size();
        // set the field null
        certifie.setName(null);

        // Create the Certifie, which fails.

        restCertifieMockMvc.perform(post("/api/certifies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(certifie)))
            .andExpect(status().isBadRequest());

        List<Certifie> certifieList = certifieRepository.findAll();
        assertThat(certifieList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCertifies() throws Exception {
        // Initialize the database
        certifieRepository.saveAndFlush(certifie);

        // Get all the certifieList
        restCertifieMockMvc.perform(get("/api/certifies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(certifie.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getCertifie() throws Exception {
        // Initialize the database
        certifieRepository.saveAndFlush(certifie);

        // Get the certifie
        restCertifieMockMvc.perform(get("/api/certifies/{id}", certifie.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(certifie.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCertifie() throws Exception {
        // Get the certifie
        restCertifieMockMvc.perform(get("/api/certifies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCertifie() throws Exception {
        // Initialize the database
        certifieRepository.saveAndFlush(certifie);

        int databaseSizeBeforeUpdate = certifieRepository.findAll().size();

        // Update the certifie
        Certifie updatedCertifie = certifieRepository.findById(certifie.getId()).get();
        // Disconnect from session so that the updates on updatedCertifie are not directly saved in db
        em.detach(updatedCertifie);
        updatedCertifie
            .name(UPDATED_NAME);

        restCertifieMockMvc.perform(put("/api/certifies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCertifie)))
            .andExpect(status().isOk());

        // Validate the Certifie in the database
        List<Certifie> certifieList = certifieRepository.findAll();
        assertThat(certifieList).hasSize(databaseSizeBeforeUpdate);
        Certifie testCertifie = certifieList.get(certifieList.size() - 1);
        assertThat(testCertifie.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingCertifie() throws Exception {
        int databaseSizeBeforeUpdate = certifieRepository.findAll().size();

        // Create the Certifie

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCertifieMockMvc.perform(put("/api/certifies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(certifie)))
            .andExpect(status().isBadRequest());

        // Validate the Certifie in the database
        List<Certifie> certifieList = certifieRepository.findAll();
        assertThat(certifieList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCertifie() throws Exception {
        // Initialize the database
        certifieRepository.saveAndFlush(certifie);

        int databaseSizeBeforeDelete = certifieRepository.findAll().size();

        // Delete the certifie
        restCertifieMockMvc.perform(delete("/api/certifies/{id}", certifie.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Certifie> certifieList = certifieRepository.findAll();
        assertThat(certifieList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Certifie.class);
        Certifie certifie1 = new Certifie();
        certifie1.setId(1L);
        Certifie certifie2 = new Certifie();
        certifie2.setId(certifie1.getId());
        assertThat(certifie1).isEqualTo(certifie2);
        certifie2.setId(2L);
        assertThat(certifie1).isNotEqualTo(certifie2);
        certifie1.setId(null);
        assertThat(certifie1).isNotEqualTo(certifie2);
    }
}
