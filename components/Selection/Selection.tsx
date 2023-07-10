import "./Selection.scss";

const Selection = () => {
  return (
    <div className="question__answer">
      <div className="section_header">
        <div className="text">
          <h1>
            <span className="part1">The fastest way to prepare</span>
            <span className="part2"> for a tech interview </span>
          </h1>
          <p>
            Check our curated list of full-stack, data structures & software
            architecture interview questions and answers for developers
          </p>
        </div>

        <div className="browse__button">
            <button className="primaryBtn">Browse All the Questions</button>
        </div>
      </div>

    <div className="q_a_section">
      <div className="selection">
        <ul className="tabList">
          <li className="item active">Web Design</li>

          <li className="item">Programming</li>

          <li className="item">Others</li>
        </ul>
      </div>

      <div className="item__details">
        <ul className="item_list">
          <li className="item active">HTML</li>

          <li className="item">CSS</li>

          <li className="item">REACT</li>

          <li className="item">node</li>

          <li className="item">typescript</li>

          <li className="item">javascript</li>

          <li className="item">Nothing</li>
        </ul>
      </div>
      </div>

    </div>
  );
};

export default Selection;
