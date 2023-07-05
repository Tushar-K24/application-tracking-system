import { Card, Text } from "@mantine/core";
import "./DisplayCard.css";

function DisplayCard({ title, content }) {
  return (
    <Card
      className="display-card"
      shadow="sm"
      padding="md"
      component="a"
      target="_blank"
    >
      <Text weight={700} size="lg" color="#253858" mt="md">
        {title}
      </Text>
      {content}
    </Card>
  );
}

export default DisplayCard;
