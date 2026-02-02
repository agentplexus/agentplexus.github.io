# A Severity Rubric for WCAG 2.2 AA Prioritization

When we audited the AgentPlexus website for accessibility, we found 14 issues. The immediate question: which ones do we fix first?

WCAG doesn't answer this. It defines conformance levels (A, AA, AAA), but not severity. A Level A failure might be cosmetic. A Level AA failure might block checkout for screen reader users. Teams need a systematic way to prioritize—so we built one.

This post shares the **severity rating rubric** we developed, the issues we addressed in our initial pass, and what formal validation still needs to happen.

## The Problem: WCAG Conformance ≠ Severity

WCAG 2.2 defines three conformance levels:
- **Level A**: Minimum accessibility requirements
- **Level AA**: Standard target for most organizations
- **Level AAA**: Enhanced accessibility

But conformance level doesn't tell you remediation priority. Consider:

- A missing `lang` attribute on a `<blockquote>` (Level AA) affects almost no user flows
- A keyboard trap in a modal (Level A) blocks every keyboard user from completing any task

Both are failures. One is urgent. WCAG doesn't distinguish between them.

## A Severity Rating Rubric

We created a four-level rubric based on **user impact**, not WCAG level:

| Severity | Definition | User Impact | Remediation |
|----------|------------|-------------|-------------|
| **Critical** | Blocks task completion | "I cannot do this" | Immediate |
| **High** | Major barrier, workaround exists | "This is very difficult" | Current sprint |
| **Medium** | Degrades experience | "This is annoying" | Next sprint |
| **Low** | Cosmetic, edge cases | "I barely noticed" | Backlog |

### The Key Question

For each issue, ask: **Can the user complete their task?**

- **No** → Critical
- **Yes, but with significant difficulty** → High
- **Yes, but experience is degraded** → Medium
- **Yes, with minimal impact** → Low

### Mapping WCAG Levels to Severity

| WCAG Level | Typical Severity | Why |
|------------|------------------|-----|
| A | Often Critical or High | Level A covers fundamentals—keyboard access, text alternatives |
| AA | Often High or Medium | Level AA covers usability—contrast, consistent navigation |
| AAA | Usually Medium or Low | Level AAA covers enhancements—sign language, extended audio |

**Important:** This is a tendency, not a rule. Context determines severity.

## What We Found

We identified 14 issues across 21 source files (3,113 lines of code). Here's how they mapped to our rubric:

### Critical (5 issues)

These blocked task completion:

| Issue | WCAG SC | Problem |
|-------|---------|---------|
| No focus indicators | 2.4.7 | Keyboard users couldn't see where they were |
| Icon-only buttons unlabeled | 4.1.2 | Screen readers announced nothing for menu, copy buttons |
| No skip link | 2.4.1 | Keyboard users had to tab through entire navigation |
| Mobile menu trapped focus | 2.1.1 | No Escape key, couldn't exit menu |
| Copy feedback not announced | 4.1.3 | Screen readers didn't confirm copy action |

### High (6 issues)

Major barriers with workarounds:

| Issue | WCAG SC | Problem |
|-------|---------|---------|
| Generic link text | 2.4.4 | "Learn More" repeated with no context |
| No reduced motion support | 2.3.3 | Animations ignored user preference |
| Hover effects not on focus | 2.4.7 | Keyboard users missed visual feedback |
| No active page indicator | 2.4.8 | Users couldn't tell which page they were on |
| Insufficient contrast | 1.4.3 | Gray text too light on dark background |
| Color-only status badges | 1.4.1 | Stable/Beta/Coming Soon distinguished only by color |

### Medium (3 issues)

Experience degraded but tasks completable:

| Issue | WCAG SC | Problem |
|-------|---------|---------|
| Missing nav ARIA label | 4.1.2 | Navigation not identified to screen readers |
| Low logo opacity | - | Integration logos hard to see |
| No section landmarks | 1.3.1 | Screen reader users couldn't navigate by region |

## Implementation Patterns

Here are the patterns we applied. These are common solutions—nothing novel, but worth documenting.

### Skip Link

```tsx
<a href="#main-content"
   className="sr-only focus:not-sr-only focus:absolute focus:top-4
              focus:left-4 focus:z-[100] focus:px-4 focus:py-2
              focus:bg-plexus-purple focus:text-white focus:rounded-lg">
  Skip to main content
</a>
```

Hidden until focused. Requires `id="main-content"` on the main element.

### Focus-Visible vs Focus

```tsx
className="focus-visible:outline-none
           focus-visible:ring-2
           focus-visible:ring-plexus-purple"
```

`focus-visible` triggers on keyboard navigation but not mouse clicks. This preserves design intent for mouse users while providing clear indicators for keyboard users.

### Mobile Menu Focus Management

```tsx
const firstMenuItemRef = useRef<HTMLAnchorElement>(null)
const menuButtonRef = useRef<HTMLButtonElement>(null)

useEffect(() => {
  if (isOpen) firstMenuItemRef.current?.focus()
}, [isOpen])

useEffect(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false)
      menuButtonRef.current?.focus()
    }
  }
  document.addEventListener('keydown', handleEscape)
  return () => document.removeEventListener('keydown', handleEscape)
}, [isOpen])
```

Focus moves into menu when opened, returns to trigger button on Escape.

### Color Independence

```tsx
const statusBadges = {
  stable: { text: '✓ Stable', class: 'bg-green-500/20 text-green-400' },
  beta: { text: '⚡ Beta', class: 'bg-yellow-500/20 text-yellow-400' },
  'coming-soon': { text: '○ Coming Soon', class: 'bg-gray-500/20 text-gray-400' },
}
```

Icon + text + color. Never rely on color alone.

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Respects user preference at the system level.

## What This Is—and Isn't

**This is an initial implementation pass.** We identified issues, prioritized them with a rubric, and applied fixes.

**This is not verified WCAG 2.2 AA compliance.** That requires:

### Automated Testing (Not Yet Done)
- [ ] Lighthouse accessibility audit
- [ ] axe DevTools scan on all pages
- [ ] WAVE evaluation
- [ ] Contrast ratio verification with WebAIM

### Manual Testing (Not Yet Done)
- [ ] Full keyboard-only navigation test
- [ ] Screen reader testing (VoiceOver, NVDA, JAWS)
- [ ] Browser zoom at 200%
- [ ] High contrast mode
- [ ] Reduced motion preference enabled

### Ongoing Validation (Not Yet Established)
- [ ] Accessibility checks in CI/CD
- [ ] Regression testing for new components
- [ ] Periodic re-audit schedule

We're sharing this as a starting point, not a finish line.

## What Automated Tools Can't Catch

Even after running axe and Lighthouse, manual testing is required for:

- **Logical focus order** — Tools can detect missing focus indicators but not illogical tab sequences
- **Meaningful alt text** — Tools can detect missing alt attributes but not whether "image" is a useful description
- **Keyboard interaction patterns** — Complex widgets (modals, dropdowns, accordions) need manual verification
- **Screen reader announcements** — Live regions and dynamic content need real-world testing
- **Cognitive accessibility** — Clear language, predictable navigation, error recovery

## Using the Rubric

The full rubric is available at [RUBRIC.md](https://github.com/agentplexus/agentplexus-docs/blob/main/accessibility/RUBRIC.md). It includes:

- Detailed definitions for each severity level
- Example WCAG success criteria at each level
- A scoring model for complex prioritization
- Workflow mappings (severity → Jira priority)
- Release acceptance criteria

Adapt it to your context. A checkout flow failure is Critical for e-commerce but might be High for an internal tool. A contrast issue on a marketing hero might be Medium; on a legal document, it's High.

## Recommendations

For teams starting WCAG 2.2 AA work:

1. **Build a severity rubric first.** WCAG doesn't prioritize for you. Decide what "Critical" means for your product before auditing.

2. **Fix Critical issues before auditing further.** A keyboard trap on page 1 matters more than finding 50 Medium issues across the site.

3. **Phase by visual impact.** Non-visual changes (ARIA, focus management) are low-risk. Visual changes (contrast, spacing) require design review. Do non-visual first.

4. **Use `focus-visible`, not `focus`.** Modern browsers support it. Your designers will thank you.

5. **Test with real assistive technology.** Automated tools catch ~30-40% of issues. The rest require a screen reader, keyboard-only testing, and ideally users with disabilities.

6. **Establish regression prevention.** One accessibility pass isn't enough. Add axe to CI, document patterns, train developers.

## Resources

- [Our Severity Rating Rubric](https://github.com/agentplexus/agentplexus-docs/blob/main/accessibility/RUBRIC.md)
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/)

## Conclusion

The most useful thing we built wasn't the fixes—it was the rubric. WCAG tells you what to comply with, not what to prioritize. A severity framework based on user impact gives teams a defensible, consistent way to triage accessibility work.

Our initial pass addressed 14 issues across Critical, High, and Medium severity. Formal validation with automated tools and assistive technology testing is the next step. We'll update this post when that's complete.

The rubric is MIT licensed. Take it, adapt it, use it.
