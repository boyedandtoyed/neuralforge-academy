import { notFound } from 'next/navigation';
import LessonLayout from '@/components/lesson/LessonLayout';
import LessonContent from '@/components/lesson/LessonContent';
import { LESSON_CONTENT, COURSE_LESSONS, COURSE_TITLES } from '@/lib/lessonData';

interface Props {
  params: { courseSlug: string; lessonSlug: string };
}

export function generateStaticParams() {
  const params: { courseSlug: string; lessonSlug: string }[] = [];
  for (const [courseSlug, lessons] of Object.entries(COURSE_LESSONS)) {
    for (const lesson of lessons) {
      params.push({ courseSlug, lessonSlug: lesson.slug });
    }
  }
  return params;
}

export default function LessonPage({ params }: Props) {
  const { courseSlug, lessonSlug } = params;

  const lessons = COURSE_LESSONS[courseSlug];
  const courseTitle = COURSE_TITLES[courseSlug];
  if (!lessons || !courseTitle) notFound();

  const lessonMeta = lessons.find(l => l.slug === lessonSlug);
  if (!lessonMeta) notFound();

  const content = LESSON_CONTENT[`${courseSlug}/${lessonSlug}`];

  return (
    <LessonLayout
      courseSlug={courseSlug}
      courseTitle={courseTitle}
      currentLesson={lessonSlug}
      lessons={lessons}
    >
      <LessonContent content={content} lessonTitle={lessonMeta.title} lessonKey={`${courseSlug}/${lessonSlug}`} />
    </LessonLayout>
  );
}
