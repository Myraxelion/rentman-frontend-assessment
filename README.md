<h1>README</h1>
This project is for the Rentman frontend assessment. This is my first time using Vite and it created another folder so I just put everything in that one.

<h2>Run Instructions</h2>
<ol>
  <li>
    In the terminal, go to /rentman-frontend-assessment/rentman-frontend-assessment
  </li>
  <li>
    Run <code>npm run dev</code>
  </li>
  <li>
    In browser, go to http://localhost:5173/ (or whatever the terminal tells you)
  </li>
  <li>
    You should see the project
  </li>
</ol>

I'm using node v24.12.0 so that should work.

<h2>Additional Notes</h2>
<ul>
  <li>
    I assumed a valid folder hierarchy from the backend for this one, so I didn't add validation (and the assignment didn't mention it), but in theory there should probably be validation. I would check for duplicate ids, invalid ids, circular references (like putting a folder in itsself or putting folder A in B and B in A), items without folders, etc. Somewhere in the service near where the data is being mapped.
  </li>
  <li>
    I wasn't 100% sure what was wanted for retrieving the response.json file. I put the data fetching in a service and just used the import statement there, but it could be easily substituted for some sort of API call or JSON streaming or something. I used import since I thought that the idea was to use a service instead of importing the data ad hoc into the components, and I didn't want to do anything fancy like making an actual endpoint. But I could be wrong on that.
  </li>
  <li>
    I eyeballed the styling and I think it's mostly in line with the design. I didn't want to spend too much more time on it but the hover color should definitely cover the entire width of the selector instead of just the item.
  </li>
</ul>
