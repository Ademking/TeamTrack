package com.teamtrack.boilerplate.springboot.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamtrack.boilerplate.springboot.model.Announcement;
import com.teamtrack.boilerplate.springboot.service.AnnonceService;

import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/annonces")
public class AnnoncesController {

    private final AnnonceService annonceService;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_EMPLOYEE') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Announcement>> getAllAnnonces() {
        List<Announcement> annonces = annonceService.getAllAnnonces();
        return ResponseEntity.ok().body(annonces);
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Announcement> addAnnonce(@Valid @RequestBody Announcement annonce) {
        Announcement newAnnonce = annonceService.addAnnonce(annonce);
        return ResponseEntity.ok().body(newAnnonce);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Announcement> updateAnnonce(@Valid @RequestBody Announcement annonce, @PathVariable(value = "id") Long annonceId) {
        Announcement updatedAnnonce = annonceService.updateAnnonce(annonceId, annonce);
        return ResponseEntity.ok().body(updatedAnnonce);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteAnnonce(@PathVariable(value = "id") Long annonceId) {
        annonceService.deleteAnnonce(annonceId);
        return ResponseEntity.ok().build();
    }

}
