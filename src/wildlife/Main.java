package wildlife;

/*

Also add specific errors

You need a sanctuary, it has zones, it has animals, it has rangers, it has patrols, and there are reports

Here’s a completely different OOP problem for you to solve. It's unrelated to the typical `Library`-style management systems and dives into the domain of **wildlife tracking**.

---

### Problem: Wildlife Sanctuary Tracking System

You are tasked with designing a **Wildlife Sanctuary Tracking System** to manage the sanctuary's animal population and track ranger patrols. The sanctuary houses animals across different **zones**, and rangers are responsible for tracking these animals' health and locations during patrols.

---

### Requirements:

#### 1. **Animals**:
- Each animal has a unique **ID**, **species** (e.g., Lion, Elephant), **age**, and **health status** (e.g., Healthy, Injured, Sick).
- Animals belong to a specific **zone** of the sanctuary.
- Animals can move between zones.

#### 2. **Zones**:
- Each zone has a unique **zone ID**, a **name** (e.g., Savannah, Rainforest), and a **capacity** for the maximum number of animals it can house.
- A zone should track the animals currently residing in it.

#### 3. **Rangers**:
- Each ranger has a unique **ID**, **name**, and the zones they are assigned to patrol.
- Rangers log animal **observations** during patrols, recording the animal’s **ID**, **health status**, and any additional notes.

#### 4. **Patrols**:
- A ranger can start a **patrol** in one or more zones, during which they can log **animal observations**.
- A patrol can be marked as **complete**, with a summary of the animals observed and any notable issues (e.g., Injured or Sick animals that require attention).

#### 5. **Reports**:
- Generate reports for:
  - **Animals by zone**, listing all animals currently in each zone.
  - **Ranger patrol history**, detailing the observations made during their patrols.
  - A list of all animals marked as **Injured** or **Sick** and their last known location.

---

### Example Classes You Might Need:
1. `Animal`
2. `Zone`
3. `Ranger`
4. `Patrol`
5. `Observation`

---

### Example Scenarios:
1. Move an animal from one zone to another.
2. Start a patrol for a ranger and log observations.
3. Generate a report of all animals in the sanctuary, grouped by zone.
4. List all injured animals and notify the rangers responsible for their zones.

---

### Constraints:
- The sanctuary must enforce zone capacity limits.
- Animal movements should update their current zone and ensure the source zone is updated.
- Observations can only be made for animals currently in a ranger's assigned zones.

---

### Your Task:
Design and implement this system with OOP principles. Focus on defining clear relationships between classes, encapsulation, and handling edge cases (e.g., exceeding zone capacity, moving animals to non-existent zones).
 */

public class Main {
    public static void main(String[] args) {

    }
}
