import './sectionHeader.component.scss';


const SectionHeader = (props) => {

  return (
    <h2 className="sectionHeader">
      {props.text ? props.text : 'Default Section Header'}
    </h2>
  );
};

export default SectionHeader;