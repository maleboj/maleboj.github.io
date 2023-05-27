#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "MyActor.generated.h"

UCLASS()
class MYPROJECT_API AMyActor : public AActor
{
	GENERATED_BODY()
	
public:	
	// Sets default values for this actor's properties
	AMyActor();

protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

public:	
	// Called every frame
	virtual void Tick(float DeltaTime) override;

private:
	// Set up variables for character names and dialogue text
	FString characterName = "";
	FString dialogueText = "";

	// Define a function to display dialogue
	void displayDialogue(FString name, FString text);

	// Define the opening scene
	displayDialogue("Narrator", "You wake up in a strange room, unsure of how you got there.");

	// Define a branching path based on player choices
	FString choice = FString::Input("What do you do?\n1. Look around the room\n2. Try to open the door");
	if (choice == "1") {
	  displayDialogue("Narrator", "You see a desk with a key on it.");
	} else if (choice == "2") {
	  displayDialogue("Narrator", "The door is locked. You'll need to find a key.");
	}

	// Define another branching path
	choice = FString::Input("What do you do next?\n1. Pick up the key\n2. Search the room for other clues");
	if (choice == "1") {
	  displayDialogue("Narrator", "You pick up the key and try it in the door. It opens.");
	} else if (choice == "2") {
	  displayDialogue("Narrator", "You find a note with a clue to the key's location.");
	}

	// Define the ending scene
	displayDialogue("Narrator", "You escape the room and breathe a sigh of relief.");

	// Define the game loop
	while (true) {
	  // Display the character name and dialogue text
	  display(characterName, dialogueText);

	  // Wait for player input
	  FString input = FString::Input("Press any key to continue...");

	  // Clear the screen for the next scene
	  ClearScreen();
	}
};

// Implement the displayDialogue function
void AMyActor::displayDialogue(FString name, FString text) {
  characterName = name;
  dialogueText = text;
}
