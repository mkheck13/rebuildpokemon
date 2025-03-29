# Pokemon App Rebuild

**Description:** Create a single page pokemon application using the Pokemon API and Next.JS / TypeScript

![Design preview for Pokemon App Rebuild](./src/assets/ScreenshotPoke.png)

***Here are the requirements that are needed:***
- Built in Next.JS / TypeScript 
- using the Pokemon API https://pokeapi.co/
- Ability to search by name and Pokedex Number
    - only Gen 1 - 5 pokemon
    - Ability to search by name and Pokedex Number
    - Ability to get a random pokemon
    - image of pokemon and shiny form
    - Pokemon Name
    - show 1 location from any game. If pokemon doesn't have a location, have it return "N/A"
    - Element Typing
    - All possible abilities
    - All possible moves
    - Show Evolutionary Paths, if pokemon doesn't have an evolutionary path, have it return "N/A"
    - Favorites list
- TailWind 
- Have a Prototype in Figma (Desktop, Tablet, Mobile)
- Mobile and Desktop versions must be built out


**Developer:** Michael Heckerman

**Date Revised:** 3/28/25


## Link(s):

[Original Figma](https://www.figma.com/design/LTpU7YtFvvQuylzyliqyDY/Untitled?node-id=0-1&t=ivOgk45xUIBGCYcp-1)

[Github-Repo](https://github.com/mkheck13/rebuildpokemon)

[Vercel](https://rebuildpokemon-o8nj.vercel.app/)

## FeedBack/Peer Review: 

**Reviewer:** Thao Vang

**Comments:** finally causes alert even when the fetch is working. when typing in a string search that returns error, 
for some reason creates multiple alerts, it doesn't do it for when you type in an incorrect number. everything else seems to be working
well. just some small things you can do: add hover:cursor-pointer to buttons so you know what is pressable. if you really want to take on the
challenge you can try to remove the hyphens just to make it a bit more aesthetically pleasing. responsiveness works.

**Update:** Fixed the finally issue by making it into a catch with an extra error message. Added the hover to buttons so it's easier to tell what is a button. Added the ability to look up certain pokemon without having to use hyphens, "Thundurus" instead of "Thundurus-incarnate"