// Charts Module - Canvas-based charts for statistics page

// Chart Colors
const CHART_COLORS = {
  primary: 'hsl(175, 80%, 50%)',
  info: 'hsl(199, 89%, 48%)',
  success: 'hsl(142, 70%, 45%)',
  warning: 'hsl(38, 92%, 50%)',
  purple: 'hsl(280, 70%, 50%)',
  muted: 'hsl(215, 20%, 45%)',
  grid: 'hsl(222, 30%, 18%)',
  text: 'hsl(215, 20%, 55%)',
  background: 'hsl(222, 47%, 8%)',
};

// Weekly activity data
const weeklyData = [
  { day: 'Seg', screenshots: 18, organized: 15 },
  { day: 'Ter', screenshots: 24, organized: 22 },
  { day: 'Qua', screenshots: 20, organized: 18 },
  { day: 'Qui', screenshots: 32, organized: 28 },
  { day: 'Sex', screenshots: 28, organized: 25 },
  { day: 'Sáb', screenshots: 22, organized: 20 },
  { day: 'Dom', screenshots: 20, organized: 20 },
];

// App distribution data
const appDistribution = [
  { name: 'Chrome', count: 45, color: CHART_COLORS.primary },
  { name: 'VS Code', count: 32, color: CHART_COLORS.info },
  { name: 'Figma', count: 28, color: CHART_COLORS.success },
  { name: 'Slack', count: 19, color: CHART_COLORS.warning },
  { name: 'Discord', count: 15, color: CHART_COLORS.purple },
  { name: 'Outros', count: 25, color: CHART_COLORS.muted },
];

// Draw Activity Area Chart
function drawActivityChart() {
  const canvas = document.getElementById('activityChart');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  
  // Set canvas size for high DPI
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  
  const width = rect.width;
  const height = rect.height;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  // Find max value for scaling
  const maxValue = Math.max(...weeklyData.map(d => Math.max(d.screenshots, d.organized)));
  const yScale = chartHeight / maxValue;
  const xStep = chartWidth / (weeklyData.length - 1);
  
  // Clear canvas
  ctx.clearRect(0, 0, width, height);
  
  // Draw grid lines
  ctx.strokeStyle = CHART_COLORS.grid;
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 3]);
  
  for (let i = 0; i <= 4; i++) {
    const y = padding.top + (chartHeight / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();
    
    // Y-axis labels
    ctx.fillStyle = CHART_COLORS.text;
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(Math.round(maxValue - (maxValue / 4) * i), padding.left - 10, y + 4);
  }
  
  ctx.setLineDash([]);
  
  // Draw X-axis labels
  ctx.fillStyle = CHART_COLORS.text;
  ctx.textAlign = 'center';
  weeklyData.forEach((d, i) => {
    const x = padding.left + i * xStep;
    ctx.fillText(d.day, x, height - padding.bottom + 25);
  });
  
  // Helper function to create gradient
  function createGradient(color, opacity = 0.3) {
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    gradient.addColorStop(0, color.replace(')', `, ${opacity})`).replace('hsl', 'hsla'));
    gradient.addColorStop(1, color.replace(')', ', 0)').replace('hsl', 'hsla'));
    return gradient;
  }
  
  // Draw area for organized
  ctx.beginPath();
  ctx.moveTo(padding.left, height - padding.bottom);
  weeklyData.forEach((d, i) => {
    const x = padding.left + i * xStep;
    const y = height - padding.bottom - d.organized * yScale;
    if (i === 0) ctx.lineTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.lineTo(padding.left + (weeklyData.length - 1) * xStep, height - padding.bottom);
  ctx.closePath();
  ctx.fillStyle = createGradient(CHART_COLORS.info);
  ctx.fill();
  
  // Draw line for organized
  ctx.beginPath();
  weeklyData.forEach((d, i) => {
    const x = padding.left + i * xStep;
    const y = height - padding.bottom - d.organized * yScale;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = CHART_COLORS.info;
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Draw area for screenshots
  ctx.beginPath();
  ctx.moveTo(padding.left, height - padding.bottom);
  weeklyData.forEach((d, i) => {
    const x = padding.left + i * xStep;
    const y = height - padding.bottom - d.screenshots * yScale;
    if (i === 0) ctx.lineTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.lineTo(padding.left + (weeklyData.length - 1) * xStep, height - padding.bottom);
  ctx.closePath();
  ctx.fillStyle = createGradient(CHART_COLORS.primary);
  ctx.fill();
  
  // Draw line for screenshots
  ctx.beginPath();
  weeklyData.forEach((d, i) => {
    const x = padding.left + i * xStep;
    const y = height - padding.bottom - d.screenshots * yScale;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = CHART_COLORS.primary;
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Draw data points
  weeklyData.forEach((d, i) => {
    const x = padding.left + i * xStep;
    
    // Screenshots point
    const y1 = height - padding.bottom - d.screenshots * yScale;
    ctx.beginPath();
    ctx.arc(x, y1, 4, 0, Math.PI * 2);
    ctx.fillStyle = CHART_COLORS.primary;
    ctx.fill();
    
    // Organized point
    const y2 = height - padding.bottom - d.organized * yScale;
    ctx.beginPath();
    ctx.arc(x, y2, 4, 0, Math.PI * 2);
    ctx.fillStyle = CHART_COLORS.info;
    ctx.fill();
  });
}

// Draw Pie/Donut Chart for Distribution
function drawDistributionChart() {
  const canvas = document.getElementById('distributionChart');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  
  const width = rect.width;
  const height = rect.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const outerRadius = Math.min(width, height) / 2 - 10;
  const innerRadius = outerRadius * 0.65;
  
  const total = appDistribution.reduce((sum, d) => sum + d.count, 0);
  
  let currentAngle = -Math.PI / 2; // Start from top
  
  // Animation
  let animationProgress = 0;
  const animationDuration = 1000;
  const startTime = Date.now();
  
  function animate() {
    const elapsed = Date.now() - startTime;
    animationProgress = Math.min(elapsed / animationDuration, 1);
    const easeProgress = 1 - Math.pow(1 - animationProgress, 3); // Ease out cubic
    
    ctx.clearRect(0, 0, width, height);
    
    currentAngle = -Math.PI / 2;
    
    appDistribution.forEach((d) => {
      const sliceAngle = (d.count / total) * Math.PI * 2 * easeProgress;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, currentAngle, currentAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
      ctx.closePath();
      ctx.fillStyle = d.color;
      ctx.fill();
      
      currentAngle += sliceAngle;
    });
    
    if (animationProgress < 1) {
      requestAnimationFrame(animate);
    }
  }
  
  animate();
  
  // Populate legend
  const legendContainer = document.getElementById('distributionLegend');
  if (legendContainer) {
    legendContainer.innerHTML = appDistribution.map(d => {
      const percentage = ((d.count / total) * 100).toFixed(0);
      return `
        <div class="distribution-legend-item">
          <span class="distribution-legend-color" style="background: ${d.color}"></span>
          <span class="distribution-legend-name">${d.name}</span>
          <span class="distribution-legend-value">${percentage}%</span>
        </div>
      `;
    }).join('');
  }
}

// Draw Progress Ring
function drawProgressRing() {
  const canvas = document.getElementById('progressRing');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  
  canvas.width = 180 * dpr;
  canvas.height = 180 * dpr;
  ctx.scale(dpr, dpr);
  
  const centerX = 90;
  const centerY = 90;
  const radius = 75;
  const lineWidth = 12;
  const progress = 0.9; // 90%
  
  // Animation
  let animationProgress = 0;
  const animationDuration = 1500;
  const startTime = Date.now();
  
  function animate() {
    const elapsed = Date.now() - startTime;
    animationProgress = Math.min(elapsed / animationDuration, 1);
    const easeProgress = 1 - Math.pow(1 - animationProgress, 3);
    
    ctx.clearRect(0, 0, 180, 180);
    
    // Background ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'hsl(222, 30%, 14%)';
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    
    // Progress ring
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (Math.PI * 2 * progress * easeProgress);
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 180, 180);
    gradient.addColorStop(0, CHART_COLORS.primary);
    gradient.addColorStop(1, CHART_COLORS.info);
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.stroke();
    
    // Update percentage text
    const percentageEl = document.getElementById('progressPercentage');
    if (percentageEl) {
      percentageEl.textContent = Math.round(progress * 100 * easeProgress) + '%';
    }
    
    if (animationProgress < 1) {
      requestAnimationFrame(animate);
    }
  }
  
  animate();
}

// Initialize all charts
function initCharts() {
  drawActivityChart();
  drawDistributionChart();
  drawProgressRing();
}

// Redraw charts on resize
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const statsPage = document.getElementById('page-stats');
    if (statsPage && statsPage.classList.contains('page-active')) {
      initCharts();
    }
  }, 250);
});
