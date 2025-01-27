package org.freecodecamp.app.resource;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.freecodecamp.app.model.Film;
import org.freecodecamp.app.repository.FilmRepository;

import java.util.Optional;
import java.util.stream.Collectors;

@Path("/films")
public class FilmResource {

    @Inject
    FilmRepository filmRepository;

    @GET
    @Path("/hello")
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return "Hello ";
    }

    @GET
    @Path("/{filmId}")
    @Produces(MediaType.TEXT_PLAIN)
    public String getFilm(@PathParam("filmId") Short filmId) {
        Optional<Film> film = this.filmRepository.getFilm(filmId);
        return film.isPresent() ? film.get().getTitle() : "No film was found!";
    }

    @GET
    @Path("/pagedFilms/{page}/{minLength}")
    @Produces(MediaType.TEXT_PLAIN)
    public String paged(@PathParam("page") long page, @PathParam("minLength") short minLength) {
        return this.filmRepository.pages(page, minLength)
                .map(f -> {
                    return String.format("%s (%d min)", f.getTitle(), f.getLength());
                }).collect(Collectors.joining("\n"));
    }

    @GET
    @Path("/actors/{startsWith}/{minLength}")
    @Produces(MediaType.TEXT_PLAIN)
    public String actors(@PathParam("startsWith") String startsWith, @PathParam("minLength") short minLength) {
        return this.filmRepository.actors(startsWith, minLength)
                .map(f -> {
                    return String.format(
                            "%s (%d min): %s",
                            f.getTitle(),
                            f.getLength(),
                            f.getActors().stream()
                                    .map(a -> {
                                        System.out.println(a);
                                        return String.format(
                                                "%s %s",
                                                a.getFirstName(),
                                                a.getLastName()
                                        );
                                    }).collect(Collectors.joining(", "))
                    );
                }).collect(Collectors.joining("\n"));
    }

    // THIS IS DUMB because it has
    // the update in this GET
    // This is just to show you how it works
    // NEVER DO THIS!!
    @GET
    @Path("/update/{minLength}/{rentalRate}")
    @Produces (MediaType.TEXT_PLAIN)
    public String update(@PathParam("minLength") short minLength, @PathParam("rentalRate") Double rentalRate) {
        filmRepository.updateRentalRate(minLength, rentalRate);
        return filmRepository.getFilms(minLength)
                .map(f -> {
                    return String.format("%s (%d min) - $%s", f.getTitle(), f.getLength(), f.getRentalRate());
                }).collect(Collectors.joining("\n"));

    }


}
