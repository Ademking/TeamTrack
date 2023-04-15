package com.teamtrack.boilerplate.springboot.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.teamtrack.boilerplate.springboot.model.Announcement;
import com.teamtrack.boilerplate.springboot.repository.AnnonceRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnnonceService {

    private final AnnonceRepository annonceRepository;

    public List<Announcement> getAllAnnonces() {
        return annonceRepository.findAll();
    }


    public Announcement addAnnonce(Announcement annonce) {
        return annonceRepository.save(annonce);
    }

    public Announcement updateAnnonce(Long id, Announcement annonce) {
        Announcement annonceToUpdate = annonceRepository.findById(id).get();
        annonceToUpdate.setTitle(annonce.getTitle());
        annonceToUpdate.setContent(annonce.getContent());
        return annonceRepository.save(annonceToUpdate);
    }

    public void deleteAnnonce(Long id) {
        annonceRepository.deleteById(id);
    }


}
