package org.freecodecamp.app.repository;

import com.speedment.jpastreamer.projection.Projection;
import com.speedment.jpastreamer.streamconfiguration.StreamConfiguration;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import org.freecodecamp.app.model.Film$;

import com.speedment.jpastreamer.application.JPAStreamer;
import jakarta.inject.Inject;
import org.freecodecamp.app.model.Film;

import java.util.Optional;
import java.util.stream.Stream;

@ApplicationScoped
public class FilmRepository {

    @Inject
    JPAStreamer jpaStreamer;

    private static final int PAGE_SIZE = 20;

    public Optional<Film> getFilm(Short filmId) {
//        This doesn't work as a problem with jpa streamer
//        return jpaStreamer.stream(Film.class)
//                .filter(Film$.filmId.equal(Short.valueOf(filmId)))
//                .findFirst();
        // NOTE:
        // You should NOT be using .in here!!
        // but this is the only way that works for now
        return jpaStreamer.stream(Film.class)
                .filter(Film$.filmId.in(filmId))
                .findFirst();

    }

    public Stream<Film> getFilms(short minLength) {
        return jpaStreamer.stream(Film.class)
                .filter(Film$.length.greaterThan(minLength))
                .sorted(Film$.length);
    }

    // LOOK HOW THIS DOES PAGINATION!!!
    // Only fetch the columns that you want
    //      When you do this you need a matching constructor in the model
    //      Also its going to need a constructor that has no inputs
    public Stream<Film> pages(long page, short minLength) {
        return jpaStreamer.stream(Projection.select(Film$.filmId, Film$.title, Film$.length))
                .filter(Film$.length.greaterThan(minLength))
                .sorted(Film$.length)
                .skip(page * PAGE_SIZE)
                .limit(PAGE_SIZE);
    }

    // this does a join with actors!!
    // SEE HOW IT JOINS!!!
    public Stream<Film> actors(String startsWith, short minLength) {
        final StreamConfiguration<Film> sc =
                StreamConfiguration.of(Film.class).joining(Film$.actors);
        return jpaStreamer.stream(sc)
                .filter(Film$.title.startsWith(startsWith).and(Film$.length.greaterThan(minLength)))
                .sorted(Film$.length.reversed());
    }

    // Update a record
    // MUST have @Transactional
    @Transactional
    public void updateRentalRate(short minLength, Double rentalRate) {
        jpaStreamer.stream(Film.class)
                .filter(Film$.length.greaterThan(minLength))
                .forEach(f -> {
                    f.setRentalRate(rentalRate);
                });
    }
}
























