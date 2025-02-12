def individual_task(todo):
    return {
        "id": str(todo["_id"]),
        "title": todo["title"],
        "description": todo["description"],
        "status": todo["is_completed"],
    }

def all_tasks(todos):
    return [
        individual_task(todo) for todo in todos
    ]