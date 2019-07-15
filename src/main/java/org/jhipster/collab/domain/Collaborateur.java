package org.jhipster.collab.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Collaborateur.
 */
@Entity
@Table(name = "collaborateur")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Collaborateur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "content", nullable = false)
    private String content;

    @NotNull
    @Column(name = "date", nullable = false)
    private Instant date;

    @ManyToOne
    @JsonIgnoreProperties("collaborateurs")
    private Liste liste;

    @ManyToOne
    @JsonIgnoreProperties("collaborateurs")
    private Certifie certifie;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Collaborateur name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public Collaborateur content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Instant getDate() {
        return date;
    }

    public Collaborateur date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Liste getListe() {
        return liste;
    }

    public Collaborateur liste(Liste liste) {
        this.liste = liste;
        return this;
    }

    public void setListe(Liste liste) {
        this.liste = liste;
    }

    public Certifie getCertifie() {
        return certifie;
    }

    public Collaborateur certifie(Certifie certifie) {
        this.certifie = certifie;
        return this;
    }

    public void setCertifie(Certifie certifie) {
        this.certifie = certifie;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Collaborateur)) {
            return false;
        }
        return id != null && id.equals(((Collaborateur) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Collaborateur{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", content='" + getContent() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
