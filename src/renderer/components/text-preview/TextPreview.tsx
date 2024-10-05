import { Text } from "@fluentui/react";
import styles from "./styles.module.scss";

function TextPreview() {
  return (
    <div className={styles.content}>
      <Text as="h3" className={styles.title}>
        Understanding the Four Principles of Accessibility
      </Text>
      <Text as="p" className={styles.subtitle}>
        The guidelines and Success Criteria are organized around the following
        four principles, which lay the foundation necessary for anyone to access
        and use Web content. Anyone who wants to use the Web must have content
        that is:
      </Text>
      <dl>
        <div className={styles.term}>
          <dt>Perceivable</dt>
          <dd>
            Information and user interface components must be presentable to
            users in ways they can perceive. This means that users must be able
            to perceive the information being presented (it can't be invisible
            to all of their senses)
          </dd>
        </div>
        <div className={styles.term}>
          <dt>Operable</dt>
          <dd>
            User interface components and navigation must be operable. This
            means that users must be able to operate the interface (the
            interface cannot require interaction that a user cannot perform)
          </dd>
        </div>
        <div className={styles.term}>
          <dt>Understandable</dt>
          <dd>
            Information and the operation of user interface must be
            understandable. This means that users must be able to understand the
            information as well as the operation of the user interface (the
            content or operation cannot be beyond their understanding)
          </dd>
        </div>
        <div className={styles.term}>
          <dt>Robust</dt>
          <dd>
            Content must be robust enough that it can be interpreted reliably by
            a wide variety of user agents, including assistive technologies.This
            means that users must be able to access the content as technologies
            advance (as technologies and user agents evolve, the content should
            remain accessible)
          </dd>
        </div>
      </dl>
      <p>
        If any of these are not true, users with disabilities will not be able
        to use the Web.
      </p>
      <p>
        Under each of the principles are guidelines and Success Criteria that
        help to address these principles for people with disabilities. There are
        many general usability guidelines that make content more usable by all
        people, including those with disabilities. However, in WCAG 2.1, we only
        include those guidelines that address problems particular to people with
        disabilities. This includes issues that block access or interfere with
        access to the Web more severely for people with disabilities.
      </p>
    </div>
  );
}

export default TextPreview;
