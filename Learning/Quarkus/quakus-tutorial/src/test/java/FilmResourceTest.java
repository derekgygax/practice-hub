import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.containsString;

// Set up full integration tests
// This uses rest assured which makes it nice and easy

@QuarkusTest
public class FilmResourceTest {

    @Test
    public void correctlyReturnsFilmById() {
        given()
                .when().get("/films/1")
                .then()
                .statusCode(200)
                .body(containsString("Thriller A"));
    }

    // This shows a test failure!
//    @Test
//    public void incorrectlyReturnsFilmById() {
//        given()
//                .when().get("/films/1")
//                .then()
//                .statusCode(200)
//                .body(containsString("WRONG"));
//    }
}
