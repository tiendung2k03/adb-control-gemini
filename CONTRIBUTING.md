# Contribution Guidelines

## The Golden Rule for Protecting the Main Branch
Always ensure that the main branch is stable and clean. No direct commits are allowed to the main branch. Instead, all changes should be made in feature branches and merged through pull requests after thorough code reviews.

## Step-by-Step Contribution Workflow
1. **Fork the repository** to your GitHub account.
2. **Clone your fork** to your local machine.
3. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b my-feature-branch
   ```
4. **Make your changes** in the code.
5. **Commit your changes** with a descriptive message:
   ```bash
   git commit -m "Add my new feature"
   ```
6. **Push changes** to your fork:
   ```bash
   git push origin my-feature-branch
   ```
7. **Open a pull request** against the main repository.

## Development Guidelines
- Follow the code style guidelines established in the repository.
- Write clear and concise documentation for your code.
- Ensure that your code passes all tests.

## Commit Practices
- Commits should be atomic, meaning each commit should represent one logical change.
- Use meaningful commit messages that explain the purpose of the change.
- Refrain from committing commented-out code or debug statements.

## Pull Request Process
1. After pushing your branch, open a pull request against the main repository.
2. Provide a clear description of what your pull request does.
3. Tag relevant reviewers and request their feedback.
4. Make any requested changes and push them to your branch.
5. Once approved, your pull request will be merged by someone with write access.

## PR Checklist
- [ ] My code follows the repository's code style.
- [ ] I have written tests for my code.
- [ ] I have updated the documentation, if needed.
- [ ] My pull request is ready for review.

## License Information
By contributing to this project, you agree that your contributions will be licensed under the project's license. Please refer to the LICENSE file for more details.