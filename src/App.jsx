import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useField, useAnecdotes } from "./hooks";

const Menu = () => {
  const padding = { paddingRight: 5 };
  return (
    <div>
      <Link to="/" style={padding}>
        anecdotes
      </Link>
      <Link to="/create" style={padding}>
        create new
      </Link>
      <Link to="/about" style={padding}>
        about
      </Link>
    </div>
  );
};

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find((a) => String(a.id) === String(id));

  if (!anecdote) return <div>Anecdote not found</div>;

  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <div>has {anecdote.votes} votes</div>
      <div>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </div>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident...
    </em>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
  </div>
);

const CreateNew = ({ addAnecdote }) => {
  const { reset: resetContent, ...content } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetInfo, ...info } = useField("text");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addAnecdote({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/");
  };

  const handleReset = (e) => {
    e.preventDefault();
    resetContent();
    resetAuthor();
    resetInfo();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content <input {...content} />
        </div>
        <div>
          author <input {...author} />
        </div>
        <div>
          url for more info <input {...info} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};

const App = () => {
  // Extract addAnecdote directly from the custom hook!
  const { anecdotes, addAnecdote } = useAnecdotes();

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <Routes>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route
            path="/anecdotes/:id"
            element={<Anecdote anecdotes={anecdotes} />}
          />
          <Route
            path="/create"
            element={<CreateNew addAnecdote={addAnecdote} />}
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <br />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
