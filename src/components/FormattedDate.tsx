interface FormattedDateProps {
  date: Date
}

/**
 * Composant pour afficher une date formatée en français
 * @param date La date à afficher
 */
export function FormattedDate({ date }: FormattedDateProps) {
  const days = [
    "dimanche",
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
  ]
  const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ]

  return (
    <time dateTime={date.toISOString().substring(0, 10)}>
      {days[date.getDay()]}
      &nbsp;{date.getDate()}
      &nbsp;{months[date.getMonth()]}
      &nbsp;{date.getFullYear()}
    </time>
  )
}
